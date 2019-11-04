import React from 'react';
import {render, act} from '@testing-library/react';
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
    act(() => {
        const {container} = renderWithRouter(<App/>);
        expect(container.innerHTML).toMatch('Nunca dejes de buscar');
    });
});

it('navigates to items list when search is made', () => {
    act(() => {
        const {container, getByPlaceholderText, getByTestId} = renderWithRouter(<App/>);
        const searchbox = getByPlaceholderText('Nunca dejes de buscar');
        const searchIcon = getByTestId('search-box-icon');

        userEvent.type(searchbox, 'Guitarra');
        userEvent.click(searchIcon);

        waitForExpect(() => {
            expect(container.innerHTML).toMatch('Combo Guitarra Electrica Parquer Les Paul Negra Amplificador');
        }, 1000)
    });
});

it('navigates to item detail when item in list is clicked', () => {
    act(() => {
        const {getByPlaceholderText, getByTestId, getByText} = renderWithRouter(<App/>);
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

});

it('navigates directly to item detail when URL matches', () => {
    act(() => {
        const {container} = renderWithRouter(<App/>, {route: '/items/MLA603321157'});
        waitForExpect(() => {
            expect(container.innerHTML).toMatch('Calefactor Electrico Panel 500watts Econo Martin &amp; Martin');
        }, 1000)
    })
});

it('returns to main page when logo is clicked', () => {
    act(() => {
        const {getByPlaceholderText, getByTestId, getByText, getByAltText} = renderWithRouter(<App/>);
        const searchbox = getByPlaceholderText('Nunca dejes de buscar');
        const searchIcon = getByTestId('search-box-icon');
        userEvent.type(searchbox, 'Guitarra');
        userEvent.click(searchIcon);

        waitForExpect(() => {
            const firstItem = getByText('Combo Guitarra Electrica Parquer Les Paul Negra Amplificador');
            const meliLogo = getByAltText('Logo Mercado Libre');
            userEvent.click(meliLogo);
            waitForExpect(() => {
                expect(firstItem).toBeNull();
            }, 1000);
        }, 1000);
    });

});

it('shows message when no results were found', () => {
    act(() => {
        const {getByPlaceholderText, getByTestId, getByText} = renderWithRouter(<App/>);
        const searchbox = getByPlaceholderText('Nunca dejes de buscar');
        const searchIcon = getByTestId('search-box-icon');
        userEvent.type(searchbox, 'aslkdjalskdj');
        userEvent.click(searchIcon);

        waitForExpect(() => {
            expect(getByText('Lo sentimos!')).not.toBeNull();
        }, 1000)
    });
});

it('shows error message when item does not exist', () => {
    act(() => {
        // fake navigation to non existent item by pushing the URL to the history
        const {container} = renderWithRouter(<App/>, {route: '/items/MLAsarasa'});
        waitForExpect(() => {
            expect(container.innerHTML).toMatch('Lo sentimos!');
        }, 1000)
    });
});
