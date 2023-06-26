import cn from 'classnames';
import './Tabs.module.scss';

const Tabs = ({ className, onClick, selectedId, tabs }) => {
  return (
    <div className={cn('Tabs', className)}>
      {tabs &&
        tabs.map((tab) => (
          <div
            className={cn('Tab', {
              Tab__selected: tab.id === selectedId,
            })}
            key={tab.id}
            onClick={() => onClick(tab.id)}
          >
            <div
              className={cn('TabLabel', {
                TabLabel__selected: tab.id === selectedId,
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
