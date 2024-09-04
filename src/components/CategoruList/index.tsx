import React, { useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Category.module.scss';

const cx = classNames.bind(styles);

import { CATEGORY_LIST } from '../../constants.ts';
import { AppContext } from '../../context/AppProvider.tsx';

const CategoryList: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext must be used within a AppProvider');
  }

  const { selectedCategoryId, setSelectedCategoryId } = context;
  console.log(`selectedCategoryId`, selectedCategoryId);
  return (
    <div className={cx('category_wrapper')}>
      <h2>Category</h2>
      <ul className={cx('category_list')}>
        {CATEGORY_LIST.map((category) => (
          <li
            key={category.id}
            className={cx(
              'category_list-item',

              (selectedCategoryId === category.id && 'selected') || ''
            )}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <div className={cx('item-name')}>
              <img src="/public/img/Vector.png" alt="" />
              <span>{category.name}</span>
            </div>
            <span className={cx('count_item')}>2</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
