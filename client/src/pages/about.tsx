import { motion } from "framer-motion";
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About KodJobSearch</h1>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.section

          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 hover:bg-background/60 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-foreground/80">
            KodJobSearch is dedicated to connecting talented professionals with their dream careers. 
            We strive to make the job search process more efficient, transparent, and rewarding for both 
            job seekers and employers.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-background/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 hover:bg-background/60 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">For Job Seekers</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Access to quality job listings</li>
                <li>Easy application process</li>
                <li>Professional profile creation</li>
                <li>Job alerts and notifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">For Employers</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2">
                <li>Targeted talent acquisition</li>
                <li>Efficient candidate screening</li>
                <li>Company branding opportunities</li>
                <li>Analytics and insights</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-background/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 hover:bg-background/60 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Transparency</h3>
              <p className="text-foreground/80">We believe in clear, honest communication between all parties.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-foreground/80">Continuously improving our platform with cutting-edge technology.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p className="text-foreground/80">Building meaningful connections in the professional world.</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-background/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10 hover:bg-background/60 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-foreground/80 text-center">
            Have questions or suggestions? We'd love to hear from you!<br />
            Email us at: <a href="mailto:contact@kodjobsearch.com" className="text-blue-600 hover:text-blue-800">contact@kodjobsearch.com</a>
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default About;