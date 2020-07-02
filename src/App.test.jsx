/**
 * # 과제 5의 요구사항
 * 1. 카테고리
 * - 카테고리 목록 보기
 * - 카테고리 선택
 *
 * 2. 지역
 * - 지역 목록 보기
 * - 지역 선택
 *
 * 3. 레스토랑
 * - 카테고리 및 지역에 따른 레스토랑 목록 보기
 */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

import { regions, categories } from '../__fixture__/data';

import { selectRegion } from './action';

jest.mock('react-redux');
jest.mock('./services/api');

describe('<App />', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      regions,
    }));

    useDispatch.mockImplementation(() => dispatch);
  });

  afterEach(() => {
    dispatch.mockClear();
  });

  describe('render App', () => {
    it('shows regions', () => {
      const { queryByRole } = render(<App />);

      regions.forEach((region) => {
        expect(queryByRole('button', { name: region.name })).not.toBeNull();
      });

      expect(dispatch).toBeCalledTimes(1);
    });
    it('shows categories', () => {
      const { queryByRole } = render(<App />);

      categories.forEach((category) => {
        expect(queryByRole('button', { name: category.name })).not.toBeNull();
      });

      expect(dispatch).toBeCalledTimes(1);

    });
  });

  context('when the user selects region', () => {
    it('shows a region with a selection mark', () => {
      const { getByRole } = render(<App />);

      regions.forEach((region) => {
        fireEvent.click(getByRole('button', { name: region.name }));
        expect(dispatch).toBeCalledWith(selectRegion(region.name));
      });
    });
  });
});

// TODO : App TEST

// context('with a selected category', () => {
//   it('shows a mark for a selected category', () => {});
// });

// context('with a selected region &  with a selected category', () => {
//   it('shows a mark for a selected category', () => {});
//   it('shows restaurants', () => {});
// });
// ----- end : App

// describe('<Categories />', () => {
//   context('render Categories', () => {
//     it('shows categories', () => {});
//   });

//   context('with a selected category', () => {
//     it('shows a mark for a selected category', () => {});
//   });
// });

// describe('<Restaurants />', () => {
//   context('render Restaurants', () => {
//     it('does not show restaurants', () => {});
//   });
//   context('with a selected region &  with a selected category', () => {
//     it('shows restaurants', () => {});
//   });
// });
