import { ScreenLayout } from "@/layouts";
import { ContentMiPlan } from "./ContentMiPlan";
import { HeaderMiPlan } from "./HeaderMiPlan";

export const MiPlanScreen = () => {
  return (
    <ScreenLayout>
      <HeaderMiPlan />
      <ContentMiPlan />
    </ScreenLayout>
  );
};
