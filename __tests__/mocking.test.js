function Person(name, foods) {
	this.name = name;
	this.foods = foods;
}

Person.prototype.fetchFavouriteFoods = function() {
	return new Promise((resolve, reject) => {
        // simulate an API
		setTimeout(() => resolve(this.foods), 2000);
	});
};

describe('mocking learning', () => {
	it('mocks a reg function', () => {
		const fetchDogs = jest.fn();
		fetchDogs('Remsu');
		expect(fetchDogs).toHaveBeenCalled();
		expect(fetchDogs).toHaveBeenCalledWith('Remsu');
		fetchDogs('Roki');
		expect(fetchDogs).toHaveBeenCalledTimes(2);
    });
    
    it('can create a preson', () => {
        const me = new Person('Neema', ['õunamahl', 'pähklid']);
        expect(me.name).toBe('Neema');
    })
    it('can fetch foods', async () => {
        const me = new Person('Neeme', ['õunamahl', 'pähklid']);
        // mock the favFoods function
        me.fetchFavouriteFoods = jest.fn().mockResolvedValue(['õunamahl', 'pasta'])
        const favFoods = await me.fetchFavouriteFoods();
        expect(favFoods).toContain("pasta");
    })
});
