import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Categories from "../../Pages/Categorie/Categories";
import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";

import "@testing-library/jest-dom";

vi.mock("axios");

describe("Categories Component", () => {
  test("Fetches and displays categories correctly", async () => {
    // Données simulées pour l'API
    const mockCategories = [
      {
        _id: "1",
        nom: "JavaScript",
        image: "/img/js.ico",
        description: "JavaScript est un langage de programmation.",
        createdAt: "2024-09-01T12:00:00Z",
      },
      {
        _id: "2",
        nom: "Java",
        image: "/img/java.ico",
        description: "Java est un langage de programmation orienté objet.",
        createdAt: "2024-09-01T12:00:00Z",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockCategories });

    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    // Attendre que les catégories soient chargées et affichées
    await waitFor(() => {
      const categoryTitle = screen.getByRole("heading", {
        name: /Catégories/i,
      });
      expect(categoryTitle).to.exist;

      expect(screen.getByText("JavaScript")).toBeDefined();
      expect(screen.getByText("Java")).toBeDefined();
    });

    // Vérifie que les images des catégories sont bien affichées
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "/img/js.ico");
    expect(images[1]).toHaveAttribute("src", "/img/java.ico");
  });

  test("Handles API with categries errors", async () => {
    // Simule une erreur pour l'appel API
    axios.get.mockRejectedValueOnce(
      new Error("Erreur de chargement des catégories")
    );

    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    // Attendre que le message d'erreur soit affiché
    await waitFor(() => {
      expect(
        screen.getByText(
          "Impossible de charger les catégories. Veuillez réessayer."
        )
      ).toBeInTheDocument();
    });
  });

  test("Fails to find a non-existent element", () => {
    render(<Categories />);

    expect(screen.getByText("Ce texte n'existe pas")).toBeInTheDocument();
  });
});
