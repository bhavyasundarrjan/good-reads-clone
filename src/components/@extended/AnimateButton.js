import PropTypes from 'prop-types';

// third-party
import { motion } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

export default function AnimateButton({ children }) {
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      );
}

AnimateButton.propTypes = {
  children: PropTypes.node,
};

AnimateButton.defaultProps = {
  type: 'scale'
};
