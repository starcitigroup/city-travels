import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, Clock, Award, Headphones } from 'lucide-react';

const features = [
  {
    title: 'Vetted Partners',
    description: 'We personally vet every hotel and driver to ensure your safety and comfort.',
    icon: <ShieldCheck size={28} />,
    color: 'bg-blue-500',
  },
  {
    title: '24/7 Support',
    description: 'Our team is always just a phone call away, anytime during your journey.',
    icon: <Headphones size={28} />,
    color: 'bg-secondary',
  },
  {
    title: 'Best Price',
    description: 'We negotiate directly with vendors to give you the best rates without hidden costs.',
    icon: <Award size={28} />,
    color: 'bg-indigo-500',
  },
  {
    title: 'Custom Plans',
    description: 'No cookie-cutter plans. We craft every trip based on your preferences.',
    icon: <Clock size={28} />,
    color: 'bg-emerald-500',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WhyUs = () => {
  return (
    <section id="why-us" className="relative py-28 text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/40 via-transparent to-secondary/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight"
          >
            Why Choose <span className="text-secondary">StarCiti</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg font-medium opacity-80"
          >
            We don't just book tickets; we design experiences. Here is why thousands of travelers trust our journey planning.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="p-10 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 text-center group transition-all duration-500"
            >
              <div className={`mb-8 inline-flex p-5 ${feature.color} text-white rounded-3xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;