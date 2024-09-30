import { motion } from "framer-motion";

const Loader = () => {
  const boxVariant = {
    start: { y: 0 },
    end: (i) => ({
      y: ["0%", "30%", "0%"], 
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: i * 0.2,
        repeat: Infinity,
        repeatType: "loop",
      },
    }),
  };

  return (
    <div className="flex flex-col justify-center items-center h-[500px] w-screen bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold text-[##130912] mb-8">
        Loading News....
      </h1>
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-10 h-10 bg-[#E77917] rounded-md"
            custom={i} 
            variants={boxVariant}
            initial="start"
            animate="end"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
