import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

describe('Counter', function () {
    let container;

    beforeEach(function () {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(function () {
        document.body.removeChild(container);
        container = null;
    });

    it('Render component Counter', function () {
        act(() => {
            ReactDOM.render(<Counter />, container);
        });

        const button = container.querySelector('button');
        const label = container.querySelector('p');

        expect(label.textContent).to.be.equal('You clicked 0 times');
        expect(document.title).to.be.equal('You clicked 0 times');

        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(label.textContent).to.be.equal('You clicked 1 times');
        expect(document.title).to.be.equal('You clicked 1 times');
    });
});
