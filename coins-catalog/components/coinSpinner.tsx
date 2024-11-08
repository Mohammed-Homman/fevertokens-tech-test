import { motion } from 'framer-motion';
import Image from 'next/image';

const BitcoinSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    }}
    className="flex items-center justify-center"
  >
    <Image
      src="/bitcoin.png" 
      alt="Loading"
      width={50} 
      height={50}
      className="rounded-full" 
    />
  </motion.div>
);

export default BitcoinSpinner;
