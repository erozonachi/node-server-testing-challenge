const db = require('../data/dbConfig');
const Countries = require('./CountriesModel');

beforeEach(async () => {
  await db('countries').truncate();
});

describe('Countries.insert', () => {
  it('can add countries to the db!', async () => {
    let countries = await Countries.get();
    expect(countries).toHaveLength(0);

    await Countries.insert({ name: 'Nigeria', capital: 'Abuja', population: 150000000 });
    await Countries.insert({ name: 'Ghana', capital: 'Accra', population: 30000000 });
    countries = await Countries.get();

    expect(countries).toHaveLength(2);
  });

  it('can insert the correct countries', async () => {

    let countries = await Countries.get();
    expect(countries).toHaveLength(0);

    await Countries.insert({ name: 'Nigeria', capital: 'Abuja', population: 150000000 });
    await Countries.insert({ name: 'Ghana', capital: 'Accra', population: 30000000 });
    countries = await Countries.get();

    expect(countries[0].name).toBe('Nigeria');
    expect(countries[1].name).toBe('Ghana');
  });

  it('returns the newly inserted country', async () => {
    const country = await Countries.insert({ name: 'Nigeria', capital: 'Abuja', population: 150000000 });
    expect(country.name).toBe('Nigeria');
  });
});

describe('Countries.delete', () => {
  it('can delete a country from the db!', async () => {
    let countries = await Countries.get();
    expect(countries).toHaveLength(0);

    await Countries.insert({ name: 'Nigeria', capital: 'Abuja', population: 150000000 });
    await Countries.insert({ name: 'Ghana', capital: 'Accra', population: 30000000 });
    countries = await Countries.get();
    expect(countries).toHaveLength(2);

    await Countries.delete(countries[0].id);
    await Countries.delete(countries[1].id);
    countries = await Countries.get();
    expect(countries).toHaveLength(0);
  });
});
