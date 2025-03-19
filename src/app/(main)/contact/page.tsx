'use client';

import SectionHeading from '@/components/common/SectionHeading';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas'; // For capturing the screen content
import jsPDF from 'jspdf'; // For generating the PDF

import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { FormEvent } from 'react';

// Dynamically import Map with SSR disabled
const Map = dynamic(() => import('@/components/common/Map'), {
  ssr: false,
});

const ContactUs = () => {
  // Function to capture and download the page as PDF
  const downloadPdf = async () => {
    const input = document.getElementById('pdfContent');

    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' = portrait, 'mm' = millimeters, 'a4' = paper size

    // Add the image to the PDF
    const imgWidth = 210; // Width of A4 paper in mm
    const pageHeight = 297; // Height of A4 paper in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const topMargin = 40; // Top margin in mm
    const bottomMargin = 10; // Bottom margin in mm
    const contentHeight = pageHeight - topMargin - bottomMargin; // Available height for content

    let heightLeft = imgHeight;
    let position = topMargin; // Start from the top margin

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= contentHeight; // Adjust remaining height

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + topMargin; // Adjust position for the next page
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= contentHeight; // Adjust height for the next page
    }

    // Save the generated PDF
    pdf.save('ContactUs.pdf');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Message has been sent successfully!!');
    e.currentTarget.reset();
  };

  return (
    <div className="mt-[80px] bg-gray-50 text-gray-800 md:mt-0">
      {/* Contact Information Section */}
      <section className="bg-white pb-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-5 mt-8 flex justify-center">
              <SectionHeading heading="Contact Information" />
            </div>
            <p className="mx-auto max-w-sm text-lg">
              Reach out to us using the contact details below or fill out
              the form to get in touch.
            </p>
          </motion.div>
          <div className="mb-5 mt-10 text-center" id="pdfContent">
            <p className="mb-4 text-lg font-semibold">
              Email:{' '}
              <a
                href="mailto:info@example.com"
                className="text-blue-500 hover:underline"
              >
                info@example.com
              </a>
            </p>
            <p className="mb-4 text-lg font-semibold">
              Phone:{' '}
              <a
                href="tel:+1234567890"
                className="text-green-500 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p className="text-lg font-semibold">
              Office Address: 123 Example St, City, State, ZIP
            </p>
            <div>&nbsp;</div>
          </div>
        </div>

        {/* Get PDF Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={downloadPdf} // Trigger download when clicked
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            type="button"
            className="mb-5 rounded-md bg-green-500 px-3 py-1 text-lg font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Download PDF
          </motion.button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 mt-10 text-center"
        >
          <div className="mb-8 flex justify-center">
            <SectionHeading heading="Contact Us" />
          </div>
          <p className="mx-auto max-w-sm text-lg">
            Please fill out the form below and we will get back to you as
            soon as possible.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row md:p-10">
          <div className="flex-1 rounded-md bg-white md:p-10">
            <div className="">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="rounded-lg bg-white p-3 shadow-md md:p-8"
              >
                <div className="mb-4">
                  <motion.label
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </motion.label>
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    type="text"
                    id="name"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <motion.label
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </motion.label>
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4">
                  <motion.label
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </motion.label>
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    type="text"
                    id="subject"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <motion.label
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </motion.label>
                  <motion.textarea
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    id="message"
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Your Message"
                  ></motion.textarea>
                </div>
                <div className="text-center">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    type="submit"
                    className="w-full rounded-md bg-green-700 px-6 py-2 text-lg font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>

          <div className="flex-1 rounded-md bg-white p-10">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
