import formatMoney from '../lib/formatMoney';
describe('formatMoney tests', () => {
	it('works with fractional dollars', () => {
		expect(formatMoney(1)).toEqual("0,01 €");
    });
    it('works with fractional dollars', () => {
		expect(formatMoney(40)).toEqual("0,40 €");
    });
    it('works with fractional dollars', () => {
		expect(formatMoney(2222)).toEqual("22,22 €");
    });
    it('leaves cents of for whole Euros', () => {
		expect(formatMoney(5000)).toEqual("50 €");
    });
    
    it('works with whole and fractional Euros', () =>{
        expect(formatMoney(3999)).toEqual("39,99 €");
        expect(formatMoney(55444010)).toEqual("554 440,10 €");
    })
});
