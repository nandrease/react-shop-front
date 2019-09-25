describe('sample test 101', () => {
	xit('works as expected', () => {
		var age = 100;
		expect(1).toEqual(1);
		expect(age).toEqual(10 * 10);
	});
	xit('handles ranges just fine', () => {
		const age = 200;
		expect(age).toBeGreaterThan(100);
	});
	// xit = x.skip
	// fit = x.only
	xit('makes a list of dog names', () => {
		const dogs = [ 'happy', 'maru' ];
		expect(dogs).toEqual(dogs);
		expect(dogs).toContain('happy');
	});
});
