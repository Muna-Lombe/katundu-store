import React from 'react';
import { EnvelopeIcon, PhoneIcon, PinIcon } from '../components/icons/otherIcons';


const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Welcome to [Your Company Name], your one-stop destination for all your [product category] needs. Founded in [year], we've been passionate about delivering high-quality products and exceptional customer service to our valued customers.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to [brief mission statement, e.g., "provide innovative and sustainable products that enhance our customers' daily lives"]. We believe in [core value, e.g., "quality, sustainability, and customer satisfaction"].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <p className="text-gray-700 mb-4">
          At [Your Company Name], we specialize in [brief description of products or services]. Our wide range of products includes [list of main product categories]. Whether you're looking for [specific use case] or [another use case], we've got you covered.
        </p>
        <p className="text-gray-700 mb-4">
          What sets us apart is our commitment to [unique selling proposition, e.g., "sourcing the finest materials", "innovative designs", "eco-friendly practices"]. We work tirelessly to ensure that every product we offer meets our high standards of quality and performance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <EnvelopeIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span>support@yourcompany.com</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center">
            <PinIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span>123 Main Street, Anytown, ST 12345, USA</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="text-gray-700 mb-4">
          We're committed to providing you with the best possible shopping experience. From our user-friendly website to our responsive customer service team, we're here to make your online shopping journey smooth and enjoyable.
        </p>
        <p className="text-gray-700">
          Thank you for choosing [Your Company Name]. We look forward to serving you and exceeding your expectations.
        </p>
      </section>
    </div>
  );
};

export default About;
