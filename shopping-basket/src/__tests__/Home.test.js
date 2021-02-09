import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
//I'm sorry, I have no experience with testing and it won't do me any good to run to implement something just to say I know
//But I'm fast learner
test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/QikServe Basket/i);
  expect(linkElement).toBeInTheDocument();
});
