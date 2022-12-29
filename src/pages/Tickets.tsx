import React, { useState } from "react";
import Carousel from "../components/Carousel";
import Modal from "../components/Modal";
import TextCard from "../components/TextCard";
import TicketCard from "../components/TicketCard";

const Tickets = () => {
  const items = [
    <TicketCard
      title="Pojedinacna ulaznica"
      modalText="x 650 rsd "
      price={650}
      modalInput
    >
      <>
        <span>
          Deca 0-12 -&gt; <strong>besplatno</strong>
        </span>
        <span>
          Odrasli (12+) -&gt; <strong>650 rsd</strong>
        </span>
      </>
    </TicketCard>,
    <TicketCard
      title="Grupna ulaznica"
      modalText="x 500 rsd "
      group
      modalInput
      price={500}
    >
      <>
        <span>
          5-20 osoba -&gt; <strong>500 rsd</strong>
        </span>
        <span>
          20-40 osoba -&gt; <strong>400 rsd</strong>
        </span>
        <span>
          40+ osoba -&gt; <strong>350 rsd</strong>
        </span>
      </>
    </TicketCard>,
    <TicketCard
      title="Ulaznica + voznja vrtom za dvoje"
      modalText="Paket ulaznice + vožnja vrtom = 2000 rsd"
      price={2000}
    >
      <>
        <span>Promo paket ulaznice za dvoje + privatna voznja po vrtu</span>
        <span>
          <strong>2000 rsd</strong>
        </span>
      </>
    </TicketCard>,
    <TicketCard
      title="Ulaznica + topli napitak"
      modalText=" Paket ulaznica + topli napitak = 1500 rsd"
      price={1500}
    >
      <>
        <span>
          Specijalan promo paket ulaznica + topli napitak po izboru, gratis
          šolja
        </span>
        <span>
          <strong>1500 rsd</strong>
        </span>
      </>
    </TicketCard>,
    <TicketCard
      title="Celodnevni paket"
      modalText="Celodnevni paket = 4000 rsd"
      price={4000}
    >
      <>
        <span>
          Specijalan promo paket ulaznica + vođeni obilazak vrta + ulazak u
          ograđene zone i hranjenje životinja
        </span>
        <span>
          <strong>4000 rsd</strong>
        </span>
      </>
    </TicketCard>,
  ];

  return (
    <>
      <div className="w-full m-auto flex justify-center items-center">
        <Carousel>
          {items.map((item, index) => {
            return (
              <div className="carousel-item" key={index}>
                {item}
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Tickets;
