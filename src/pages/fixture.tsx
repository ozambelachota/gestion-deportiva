import { Toaster } from "sonner";
import FormFixture from "../components/form-fixture";
import { ListFixture } from "../components/list-fixture.component";
import { useFixturePage } from "../hooks/useFixture.hook";
export const FixturePage = () => {
  const { vsPromocion, handleEdit, promocionesPorGrupos } = useFixturePage();
  return (
    <>
      <FormFixture />
      <ListFixture
        vsPromocion={vsPromocion}
        promociones={promocionesPorGrupos}
        onEdit={handleEdit}
      />
      <Toaster position="top-center" duration={4000} />
    </>
  );
};
