import { Toaster } from "sonner";
import FormFixture from "../form-fixture";
import { ListFixture } from "../list-fixture.component";
import { useFixturePage } from "../../hooks/useFixture.hook";

function FixtureCreate() {
  const { vsPromocion, handleEdit, promocionesFiltradas } = useFixturePage();

  return (
    <>
      <FormFixture />
      <ListFixture
        vsPromocion={vsPromocion}
        promociones={promocionesFiltradas}
        onEdit={handleEdit}
      />
      <Toaster position="top-center" duration={4000} />
    </>
  );
}

export default FixtureCreate;
