'use client';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image'; // Import the Image component from next/image
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'John Green',
    role: 'Head Gardener',
    bio: 'John has over 20 years of experience in gardening and sustainable farming practices.',
    image:
      'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=5OK7djfD3cnNmQ-DR0iQzF-vmA-iTNN1TbuEyCG1DfA=',
  },
  {
    name: 'Jane Meadows',
    role: 'Horticulturist',
    bio: 'Jane is an expert in plant biology and specializes in helping plants thrive in different climates.',
    image:
      'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=1024x1024&w=is&k=20&c=iGtRKCTRSvPVl3eOIpzzse5SvQFfImkV0TZuFh-74ps=',
  },
  {
    name: 'Emily Rose',
    role: 'Landscape Designer',
    bio: 'Emily creates beautiful garden designs that blend aesthetics with functionality, perfect for any outdoor space.',
    image:
      'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=1024x1024&w=is&k=20&c=iX0adGZVKv9wS5yrs0-hpFsJBnRAacZa1DcDZ0I9Bqk=',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Our Mission Section */}
      <section className="bg-white py-20">
        <div className="md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <SectionHeading heading="Our Mission" />
            </div>
            <p className="mx-auto max-w-md text-lg">
              Our mission is to inspire and empower people to grow their
              own gardens, no matter the space or experience level. We
              believe gardening is a rewarding and sustainable way to
              connect with nature and nourish both the body and soul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-gray-100 py-20">
        <div className="md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="flex justify-center">
              <SectionHeading heading="Meet the Team" />
            </div>
            <p className="mx-auto mb-8 max-w-md text-lg">
              Our team consists of passionate gardeners and experts in
              horticulture, landscaping, and plant care. We are dedicated
              to sharing our knowledge and helping you cultivate your own
              green oasis.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill // This will make the image fill the parent div
                    className="rounded-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-20">
        <div className="md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <SectionHeading heading="Our Story" />
            </div>
            <p className="mx-auto max-w-md text-lg">
              Our journey began with a simple love for gardening. Over the
              years, we have grown from a small community of garden
              enthusiasts to a platform that educates, inspires, and
              supports people in their gardening adventures. From beginners
              to seasoned pros, we aim to provide resources and tips for
              growing thriving gardens and embracing sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
