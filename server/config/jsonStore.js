import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Generate MongoDB-like 24-hex-char ObjectId
export const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return timestamp + random;
};

export class QueryBuilder {
  constructor(resolver) {
    this._resolver = resolver;
    this._selectFields = null;
    this._sortOpts = null;
  }

  select(fields) {
    this._selectFields = fields;
    return this;
  }

  sort(sortOpts) {
    this._sortOpts = sortOpts;
    return this;
  }

  populate() {
    return this;
  }

  async exec() {
    return await this._resolver(this._selectFields, this._sortOpts);
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

class CollectionStore {
  constructor(name) {
    this.name = name;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    this.data = this._read();
  }

  _read() {
    try {
      if (fs.existsSync(this.filePath)) {
        const content = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(content || '[]');
      }
    } catch (e) {
      console.error(`Error reading ${this.name}.json:`, e.message);
    }
    return [];
  }

  _write() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error(`Error writing ${this.name}.json:`, e.message);
    }
  }

  wrapDoc(rawDoc) {
    if (!rawDoc) return null;
    const self = this;
    const doc = { ...rawDoc };

    // MongoDB id compatibility
    doc._id = doc._id.toString();

    // Comic panels subdocument helpers
    if (Array.isArray(doc.panels)) {
      const originalPanels = [...doc.panels];
      doc.panels = originalPanels.map((p) => ({
        ...p,
        _id: p._id ? p._id.toString() : generateObjectId(),
      }));

      doc.panels.id = function (panelId) {
        return doc.panels.find((p) => p._id.toString() === panelId.toString()) || null;
      };

      doc.panels.pull = function (selector) {
        if (selector._id) {
          const index = doc.panels.findIndex((p) => p._id.toString() === selector._id.toString());
          if (index !== -1) {
            doc.panels.splice(index, 1);
          }
        }
      };

      doc.panels.push = function (panelItem) {
        if (!panelItem._id) {
          panelItem._id = generateObjectId();
        }
        Array.prototype.push.call(doc.panels, panelItem);
        return doc.panels.length;
      };
    }

    // Password comparison method for users
    if (this.name === 'users') {
      doc.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, doc.password);
      };
    }

    // .save() method
    doc.save = async function () {
      doc.updatedAt = new Date();
      const idx = self.data.findIndex((item) => item._id.toString() === doc._id.toString());
      if (idx !== -1) {
        self.data[idx] = { ...doc };
        self._write();
      }
      return self.wrapDoc(doc);
    };

    // .deleteOne() method
    doc.deleteOne = async function () {
      const idx = self.data.findIndex((item) => item._id.toString() === doc._id.toString());
      if (idx !== -1) {
        self.data.splice(idx, 1);
        self._write();
      }
      return true;
    };

    return doc;
  }

  async create(itemData) {
    const _id = generateObjectId();
    const now = new Date();
    const record = {
      _id,
      ...itemData,
      createdAt: now,
      updatedAt: now,
    };

    // Auto-hash password if user creation
    if (this.name === 'users' && record.password) {
      const salt = await bcrypt.genSalt(10);
      record.password = await bcrypt.hash(record.password, salt);
    }

    // Prepare panels
    if (Array.isArray(record.panels)) {
      record.panels = record.panels.map((p, i) => ({
        _id: generateObjectId(),
        panelNumber: i + 1,
        ...p,
      }));
    }

    this.data.push(record);
    this._write();
    return this.wrapDoc(record);
  }

  find(query = {}) {
    return new QueryBuilder(async (selectFields, sortOpts) => {
      let results = this.data.filter((item) => this._matchesQuery(item, query));
      let wrappedResults = results.map((r) => this.wrapDoc(r));

      if (sortOpts) {
        wrappedResults.sort((a, b) => {
          for (const key of Object.keys(sortOpts)) {
            const dir = sortOpts[key];
            if (key === 'updatedAt' || key === 'createdAt') {
              const diff = new Date(b[key]) - new Date(a[key]);
              return dir === -1 ? diff : -diff;
            }
            if (key === 'title') {
              return dir === 1 ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
            if (key === 'panels.length') {
              const diff = (b.panels?.length || 0) - (a.panels?.length || 0);
              return dir === -1 ? diff : -diff;
            }
          }
          return 0;
        });
      }

      if (selectFields && selectFields.includes('-password')) {
        wrappedResults.forEach((doc) => {
          delete doc.password;
        });
      }

      return wrappedResults;
    });
  }

  findOne(query = {}) {
    return new QueryBuilder(async (selectFields) => {
      const item = this.data.find((item) => this._matchesQuery(item, query));
      if (!item) return null;
      const wrapped = this.wrapDoc(item);
      if (selectFields && selectFields.includes('-password')) {
        delete wrapped.password;
      }
      return wrapped;
    });
  }

  findById(id) {
    return new QueryBuilder(async (selectFields) => {
      if (!id) return null;
      const item = this.data.find((item) => item._id.toString() === id.toString());
      if (!item) return null;
      const wrapped = this.wrapDoc(item);
      if (selectFields && selectFields.includes('-password')) {
        delete wrapped.password;
      }
      return wrapped;
    });
  }

  async countDocuments(query = {}) {
    const results = this.data.filter((item) => this._matchesQuery(item, query));
    return results.length;
  }

  _matchesQuery(item, query) {
    for (const [key, val] of Object.entries(query)) {
      if (key === '$or' && Array.isArray(val)) {
        const orMatch = val.some((subQuery) => this._matchesQuery(item, subQuery));
        if (!orMatch) return false;
        continue;
      }

      if (key === 'panels._id') {
        const hasPanel = Array.isArray(item.panels) && item.panels.some((p) => p._id.toString() === val.toString());
        if (!hasPanel) return false;
        continue;
      }

      const itemVal = item[key];

      if (val && typeof val === 'object' && val.$regex) {
        const regex = new RegExp(val.$regex, val.$options || 'i');
        if (!regex.test(itemVal || '')) return false;
        continue;
      }

      if (itemVal === undefined || itemVal.toString() !== val.toString()) {
        return false;
      }
    }
    return true;
  }
}

export const usersStore = new CollectionStore('users');
export const comicsStore = new CollectionStore('comics');
export const charactersStore = new CollectionStore('characters');
