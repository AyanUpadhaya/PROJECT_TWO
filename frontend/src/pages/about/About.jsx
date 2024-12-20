import React from "react";

const AboutPage = () => {
  return (
    <div className="container my-5">
      <h1 className="display-4 fw-bold text-dark mb-4">
        About TheBuchhandlung
      </h1>
      <p className="fs-5 text-secondary mb-4">
        Welcome to{" "}
        <span className="fw-semibold text-dark">TheBuchhandlung</span>, a
        revolutionary platform designed to bring Germany’s local and
        international bookstores into the digital age. This project aims to
        support independently owned bookstores in creating a robust online
        presence, enhancing customer access to diverse collections, and bridging
        the gap between offline and online retail experiences.
      </p>
      <h2 className="h3 fw-semibold text-dark mb-3">Our Mission</h2>
      <p className="fs-5 text-secondary mb-4">
        The mission of TheBuchhandlung is to empower local bookstores across
        Germany by offering them a seamless platform to:
      </p>
      <ul className="list-group mb-4">
        <li className="list-group-item border-0 ps-3">
          Advertise their unique catalogues, including German and international
          books.
        </li>
        <li className="list-group-item border-0 ps-3">
          Provide customers the convenience of online purchases and secure
          payments.
        </li>
        <li className="list-group-item border-0 ps-3">
          Offer flexible fulfillment options like shipping or in-store pickup.
        </li>
      </ul>
      <h2 className="h3 fw-semibold text-dark mb-3">
        Why This Platform Matters
      </h2>
      <p className="fs-5 text-secondary mb-4">
        Many independent bookstores face challenges in reaching a wider audience
        due to limited digital resources. By joining TheBuchhandlung, bookstores
        can:
      </p>
      <ul className="list-group mb-4">
        <li className="list-group-item border-0 ps-3">
          Expand their customer base to include locals, tourists, and
          international readers.
        </li>
        <li className="list-group-item border-0 ps-3">
          Leverage modern technology to simplify inventory management and
          transactions.
        </li>
        <li className="list-group-item border-0 ps-3">
          Adapt to evolving customer preferences while preserving their local
          charm.
        </li>
      </ul>
      <h2 className="h3 fw-semibold text-dark mb-3">
        Commitment to Excellence
      </h2>
      <p className="fs-5 text-secondary">
        This platform was built with a strong commitment to innovation,
        accessibility, and user-friendly design. Every feature is tailored to
        meet the unique needs of local bookstores and their customers, ensuring
        that books continue to bring people together across Germany and beyond.
      </p>
    </div>
  );
};

export default AboutPage;
