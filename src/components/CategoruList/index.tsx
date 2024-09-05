import React, { useContext, useMemo } from 'react';
import classNames from 'classnames/bind';

import styles from './Category.module.scss';

const cx = classNames.bind(styles);

import { CATEGORY_LIST } from '../../constants.ts';
import { AppContext } from '../../context/AppProvider.tsx';
import { todoItem } from '../../App.tsx';

type CategoryListProps = {
  todoList: Array<todoItem>;
};

const CategoryList: React.FC<CategoryListProps> = ({
  todoList,
}: CategoryListProps) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext must be used within a AppProvider');
  }

  console.log(2233434, todoList);

  const countCategory = useMemo(() => {
    return todoList.reduce((acc: { [key: string]: number }, todo) => {
      acc[todo.category] = acc[todo.category] ? acc[todo.category] + 1 : 1;
      return acc;
    }, {});
  }, [todoList]);

  console.log(`countCategory`, countCategory);

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

              (selectedCategoryId === category.name && 'selected') || ''
            )}
            onClick={() => setSelectedCategoryId(category.name)}
          >
            <div className={cx('item-name')}>
              <img src="/public/img/Vector.png" alt="" />
              <span>{category.name}</span>
            </div>
            <span className={cx('count_item')}>
              {countCategory[category.name] || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
