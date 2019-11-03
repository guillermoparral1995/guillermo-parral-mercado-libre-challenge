import React from 'react';
import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import waitForExpect from 'wait-for-expect';
import App from './App';
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";

function renderWithRouter(
    ui,
    {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  }
}

it('renders searchbox without crashing', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.innerHTML).toMatch('Nunca dejes de buscar');
});

it('navigates to items list when search is made', async () => {
    const { container, getByPlaceholderText, getByTestId } = renderWithRouter(<App/>);
    const searchbox = getByPlaceholderText('Nunca dejes de buscar');
    const searchIcon = getByTestId('search-box-icon');
    userEvent.type(searchbox, 'Guitarra');
    userEvent.click(searchIcon);

    await waitForExpect(() => {
        expect(container.innerHTML).toMatch('Combo Guitarra Electrica Parquer Les Paul Negra Amplificador');
    }, 1000)
});

it('navigates to item detail when item in list is clicked', () => {
  const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter(<App/>);
  const searchbox = getByPlaceholderText('Nunca dejes de buscar');
  const searchIcon = getByTestId('search-box-icon');
  userEvent.type(searchbox, 'Guitarra');
  userEvent.click(searchIcon);

  waitForExpect(async () => {
    const firstItem = getByText('Combo Guitarra Electrica Parquer Les Paul Negra Amplificador');
    userEvent.click(firstItem);
    await waitForExpect(() => {
      expect(getByText('Descripción del producto').not.toBeNull());
    }, 1000);
  }, 1000);
});

it('returns to main page when logo is clicked', () => {
  const { getByPlaceholderText, getByTestId, getByText, getByAltText } = renderWithRouter(<App/>);
  const searchbox = getByPlaceholderText('Nunca dejes de buscar');
  const searchIcon = getByTestId('search-box-icon');
  userEvent.type(searchbox, 'Guitarra');
  userEvent.click(searchIcon);

  waitForExpect(async () => {
    const firstItem = getByText('Combo Guitarra Electrica Parquer Les Paul Negra Amplificador');
    const meliLogo = getByAltText('Logo Mercado Libre');
    userEvent.click(meliLogo);
    await waitForExpect(() => {
      expect(firstItem).toBeNull();
    }, 1000);
  }, 1000);
});

it('shows message when no results were found', async () => {
  const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter(<App/>);
  const searchbox = getByPlaceholderText('Nunca dejes de buscar');
  const searchIcon = getByTestId('search-box-icon');
  userEvent.type(searchbox, 'aslkdjalskdj');
  userEvent.click(searchIcon);

  await waitForExpect(() => {
    expect(getByText('Lo sentimos!')).not.toBeNull();
  }, 1000)
});

it('shows error message when item does not exist', async() => {
  // fake navigation to non existent item by pushing the URL to the history
  const { container } = renderWithRouter(<App/>, {route: '/items/MLAsarasa'});
  await waitForExpect(() => {
    expect(container.innerHTML).toMatch('Lo sentimos!');
  }, 1000)
});
