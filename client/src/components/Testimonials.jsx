import { Star } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This platform made rent payments effortless! Highly recommend it.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Sarah Williams",
      feedback: "Automated reminders are a lifesaver. No more late fees!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Mike Johnson",
      feedback: "Secure and fast transactions. Love the reports feature!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 border-2 border-blue-500"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 mt-2">"{testimonial.feedback}"</p>
              <div className="flex justify-center mt-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-500"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
