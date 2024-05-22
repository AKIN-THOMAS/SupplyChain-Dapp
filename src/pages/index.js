import DashLayout from "@/Layout/DashLayout";
import ViewShipments from "@/components/ViewShipments";


export default function Home() {
  return (
    <DashLayout>
      <div>
        <ViewShipments />
      </div>
    </DashLayout>
  );
}
