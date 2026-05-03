import { useGetAdoptions, useGetAnimals } from "@/api/queries/animals";
import { AdoptionRequests } from "@/components/profile/AdoptionRequests";
import { ProfileAnimalRecommendations } from "@/components/profile/ProfileAnimalRecommendations";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Footer } from "@/components/ui/Footer";
import Section from "@/components/ui/Section";
import { useAuth } from "@/hooks/useAuth";
import type { AnimalSearchFilters } from "@/types/filters";
import { isLoggingOut } from "@/utils/logoutState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const emptyFilters: AnimalSearchFilters = {
  age: "",
  animal_type: "",
  character: [],
  gender: "",
  search: "",
  size: "",
};

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthLoading, user } = useAuth();
  const { data, isLoading } = useGetAnimals(emptyFilters, 1, 8);
  const { data: adoptions = [], isLoading: areAdoptionsLoading } =
    useGetAdoptions(Boolean(user));
  const animals = data?.results ?? [];

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate(isLoggingOut() ? "/" : "/login", { replace: true });
    }
  }, [isAuthLoading, navigate, user]);

  if (isAuthLoading || !user) {
    return (
      <Section className="bg-background-light px-4 pb-16 pt-28 lg:px-16">
        <p className="mx-auto max-w-[1200px] text-xl text-dark-blue">
          Завантажуємо профіль...
        </p>
      </Section>
    );
  }

  return (
    <>
      <Section className="bg-background-light px-4 pb-8 pt-28 lg:px-16">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[360px_1fr]">
          <ProfileCard />
          <AdoptionRequests
            adoptions={adoptions}
            isLoading={areAdoptionsLoading}
          />
        </div>
      </Section>

      <Section className="bg-background-light px-4 pb-20 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <ProfileAnimalRecommendations
            animals={animals}
            isLoading={isLoading}
          />
        </div>
      </Section>

      <Footer />
    </>
  );
}
