import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
	id: '49EO',
	title: 'Suzuki GSXR',
	price: 2000,
	description: '750cc hästi sõitev ratas',
	image: 'bike.jpg',
	largeImage: 'bike_large.jpg'
};

describe('<Item/>', () => {
	it('renders and displays properly', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const PriceTag = wrapper.find('PriceTag');
		const Title = wrapper.find('Title a');
		const Img = wrapper.find('img');
		expect(PriceTag.children().text()).toBe('20 €');
		expect(Title.text()).toBe(fakeItem.title);
		expect(Img.props().src).toBe(fakeItem.image);
		expect(Img.props().alt).toBe(fakeItem.title);
	});

	it('renders out the buttons properly', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const buttonList = wrapper.find('.buttonList');
        // console.log(buttonList.debug());
		expect(buttonList.children()).toHaveLength(3);
        expect(buttonList.find('Link')).toHaveLength(1);
        expect(buttonList.find('AddToCart')).toBeTruthy();
        expect(buttonList.find('DeleteItem').exists()).toBe(true);
	});
});
