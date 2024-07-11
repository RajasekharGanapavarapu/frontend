import Accordion from "react-bootstrap/Accordion";

function FAQ() {
  const questions = [
    {
      question: "How do I book movie tickets on your website?",
      answer:
        "First complete the login and sign-up process. It will take you to the homepage where all the available movies are displayed.",
    },
    {
      question: "What payment methods are accepted for booking tickets online?",
      answer: "Paypal, PhonePe, Paytm, etc.",
    },
    {
      question: "Can I cancel or refund my movie ticket booking?",
      answer: "Users can cancel the tickets before one day only.",
    },
    {
      question:
        "Is it possible to choose specific seats during the booking process?",
      answer:
        "Yes, a detailed seating plot will be provided to the user where all the available seats are displayed. The already booked seats will be frozen and cannot be selected.",
    },
    {
      question:
        "Are there any additional fees or charges associated with online ticket bookings?",
      answer:
        "No additional fees are imposed on the users; ours is a user-friendly website.",
    },
    {
      question: "How do I receive my movie tickets after booking online?",
      answer:
        "A detailed email will be sent to the user's email. Alternatively, the user can check the status on the website by logging in with the credentials.",
    },
    {
      question: "What if I encounter issues during the online booking process?",
      answer: "A customer care number will be provided.",
    },
    {
      question:
        "Do you offer discounts or promotional codes for movie tickets?",
      answer: "Discounts are available only on festival days.",
    },
    {
      question: "Can I reschedule my movie showtime after booking?",
      answer: "No, it can't be done.",
    },
    {
      question: "How far in advance can I book movie tickets on your platform?",
      answer: "This factor depends on the demand for the released movie.",
    },
    {
      question: "What COVID-19 safety measures are in place for moviegoers?",
      answer:
        "Currently, COVID-19 is not in existence. But we would provide sanitizers and masks' coupons along with the e-ticket to the customers.",
    },
    {
      question: "What if I encounter issues during the booking process?",
      answer: "Customer care number will be provided.",
    },
    {
      question: "Can I choose my seat when booking?",
      answer:
        "Yes, a detailed seating matrix is shown from which the required seats can be selected.",
    },
    {
      question: "What happens if I forget my booking confirmation or ticket?",
      answer: "Customer care number is provided.",
    },
    {
      question: "Is it safe to enter my payment information on your website?",
      answer: "Yes, we have included hashing.",
    },
    {
      question:
        "Can I book tickets for future dates or only for the current day?",
      answer: "Tickets for the next days also be booked.",
    },
    {
      question:
        "Do you have a mobile app, and how is it different from the website?",
      answer:
        "Only the website is available; a mobile app will be released soon.",
    },
  ];
  return (
    <Accordion style={{ maxWidth: "50%", margin: "0px auto" }}>
      {questions.map((data, ind) => (
        <Accordion.Item eventKey={ind}>
          <Accordion.Header>{data.question}</Accordion.Header>
          <Accordion.Body>{data.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FAQ;