import { Bar, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../Components/card";
import useCharts from "../hooks/useCharts";
import useTickets from "../hooks/useTickets";
import HomeLayouts from "../layouts/Homelayout";



function Home() {
  const [ticketsState] = useTickets();
  const [pieChartData, lineChartData, barChartData] = useCharts();
  
  return (
    <HomeLayouts>
      <h1 className="font-semibold text-4xl mb-4  text-center mt-10 "> Welcome to CRM </h1>
      {ticketsState && (
        <div className="flex flex-row justify-center items-center gap-5 mt-20 flex-wrap">
          <Card
            titleText="Open"
            status={ ticketsState.ticketDistribution.open / ticketsState.downloadedTickets.length}
            quantity={ticketsState.ticketDistribution.open}
            background="bg-blue-50"
            borderColor="border-blue-500"
            fontColor="text-blue-500"
            dividerColor="bg-black"
            >
            <BsFillPencilFill className="inline mr-2" />
          </Card>
          <Card
            titleText="In Progress"
            status={ ticketsState.ticketDistribution.inProgress / ticketsState.downloadedTickets.length}
            quantity={ticketsState.ticketDistribution.inProgress}
            background="bg-blue-50"
            borderColor="border-orange-500"
            fontColor="text-orange-500"
            dividerColor="bg-black"
          >
            <TbProgressBolt className="inline mr-2" />
          </Card>
          <Card
            titleText="Resolved"
            status={ ticketsState.ticketDistribution.resolved / ticketsState.downloadedTickets.length}
            quantity={ticketsState.ticketDistribution.resolved}
            background="bg-purple-100"
            borderColor="border-green-500"
            fontColor="text-green-500"
            dividerColor="bg-black"
          >
            <MdOutlineDoneAll className="inline mr-2" />
          </Card>
          <Card
            titleText="On Hold"
            status={ ticketsState.ticketDistribution.onHold / ticketsState.downloadedTickets.length}
            quantity={ticketsState.ticketDistribution.onHold}
            background="bg-gray-100"
            borderColor="border-pink-500"
            fontColor="text-pink-500"
            dividerColor="bg-black"
          >
            <MdPending className="inline mr-2" />
          </Card>
          <Card
            titleText="Cancelled"
            status={ ticketsState.ticketDistribution.cancelled / ticketsState.downloadedTickets.length}
            quantity={ticketsState.ticketDistribution.cancelled}
            background="bg-blue-100"
            borderColor="border-purple-500"
            fontColor="text-purple-500"
            dividerColor="bg-black"
          >
            <MdCancel className="inline mr-2" />
          </Card>
        </div>
      )}

      <div className="mt-10 flex justify-center items-center gap-10">
        <div className="w-80 h-80">
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="mt-10 mb-10 flex justify-center items-center gap-10">
        <div className="w-[50rem] bg-[wheat] ">
          <Line data={lineChartData} />
        </div>
      </div>
      <div className="mt-10 mb-10 flex justify-center items-center gap-10">
        <div className="w-[50rem] bg-[wheat] ">
          <Bar data={barChartData} />
        </div>
      </div>
    </HomeLayouts>
  );
}

export default Home;
