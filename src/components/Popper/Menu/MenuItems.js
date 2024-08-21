import Button from "~/components/Button";
import styles from './Menu.module.scss'
import classNames from "classnames/bind";
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function MenuItem({ data, onClick, customHover }) {
  const classes = cx('menu-item', {
    separate: data.separate,
    customHover
  })
    return (
      <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick} >
        {data.title}
      </Button>
    )
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default MenuItem;