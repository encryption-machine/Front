import cn from 'classnames';

const Tabs = ({
  className = {
    tabs: '',
    bar: ['', { selected: '' }],
    label: ['', { selected: '' }],
  },
  onClick,
  selectedId,
  tabs,
}) => {
  return (
    <div className={cn(className.tabs)}>
      {tabs &&
        tabs.map((tab) => (
          <div
            className={cn(className.bar, {
              [`${className.bar[1].selected}`]: tab.id === selectedId,
            })}
            key={tab.id}
            onClick={() => onClick(tab.id)}
          >
            <div
              className={cn(className.label, {
                [`${className.label[1].selected}`]: tab.id === selectedId,
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
