import cn from 'classnames';
import style from './Tabs.module.scss';

const Tabs = ({ className, onClick, selectedId, tabs }) => {
  return (
    <div className={cn(style.tabs, className)}>
      {tabs &&
        tabs.map((tab) => (
          <div
            className={cn(style.tab, {
              [`${style.tab__selected}`]: tab.id === selectedId,
            })}
            key={tab.id}
            onClick={() => onClick(tab.id)}
          >
            <div
              className={cn(style.tabLabel, {
                [`${style.tabLabel__selected}`]: tab.id === selectedId,
              })}
            >
              {tab.label}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tabs;
