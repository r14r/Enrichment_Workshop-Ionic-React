import { TeaCategory } from '../models/TeaCategory';
import { DatabaseService } from './DatabaseService';

class TeaCategoriesDatabase extends DatabaseService {
  async getAll(): Promise<TeaCategory[]> {
    let categories: TeaCategory[] = [];
    await this.ready();
    await this.handle.transaction((tx) =>
      tx.executeSql('SELECT * FROM TeaCategories ORDER BY name', [], (_: any, r: any) => {
        for (let i = 0; i < r.rows.length; i++) categories.push(r.rows.item(i));
      })
    );

    return categories;
  }

  async get(id: number): Promise<TeaCategory> {
    let category: TeaCategory = undefined;
    await this.ready();
    await this.handle.transaction((tx) =>
      tx.executeSql('SELECT * FROM TeaCategories WHERE id = ?', [id], (_: any, r: any) => {
        if (r.rows.length) category = { ...r.rows.item(0) };
      })
    );
    return category;
  }

  async save(category: TeaCategory): Promise<TeaCategory> {
    return category.id ? this.update(category) : this.add(category);
  }

  async delete(id: number): Promise<void> {
    await this.handle.transaction((tx) => tx.executeSql('DELETE FROM TeaCategories WHERE id = ?', [id], () => {}));
  }

  private async add(category: TeaCategory): Promise<TeaCategory> {
    const cat = { ...category };
    await this.ready();
    await this.handle.transaction((tx) =>
      tx.executeSql('SELECT COALESCE(MAX(id), 0) + 1 AS newId FROM TeaCategories', [], (_: any, r: any) => {
        cat.id = r.rows.item(0).newId;
        tx.executeSql(
          'INSERT INTO TeaCategories (id, name, description) VALUES (?, ?, ?)',
          [cat.id, cat.name, cat.description],
          () => {}
        );
      })
    );
    return cat;
  }

  private async update(category: TeaCategory): Promise<TeaCategory> {
    await this.ready();
    await this.handle.transaction((tx) =>
      tx.executeSql(
        'UPDATE TeaCategories SET name = ?, description = ? WHERE id = ?',
        [category.name, category.description, category.id],
        () => {}
      )
    );
    return category;
  }
}

export default new TeaCategoriesDatabase();
