import { IconMail, IconDatabase, IconShoppingCart } from "@tabler/icons-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

type Props = {
  domains: number;
  inboxes: number;
  orders: number;
};

export function SectionCards({ domains, inboxes, orders }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-3">
      <Card className="bg-white border border-[#e5eaf2] text-[#010d39] shadow-none rounded-xl flex flex-col">
        <CardHeader>
          <CardDescription className="text-[#2261ff] flex items-center gap-2">
            <IconDatabase className="text-[#2261ff] size-6" />
            Domains
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-[#010d39] mt-2">
            {domains}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-[#7a8ca9]">
          Total domains connected
        </CardFooter>
      </Card>
      <Card className="bg-white border border-[#e5eaf2] text-[#010d39] shadow-none rounded-xl flex flex-col">
        <CardHeader>
          <CardDescription className="text-[#2261ff] flex items-center gap-2">
            <IconMail className="text-[#2261ff] size-6" />
            Inboxes
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-[#010d39] mt-2">
            {inboxes}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-[#7a8ca9]">
          Total mailboxes available
        </CardFooter>
      </Card>
      <Card className="bg-white border border-[#e5eaf2] text-[#010d39] shadow-none rounded-xl flex flex-col">
        <CardHeader>
          <CardDescription className="text-[#2261ff] flex items-center gap-2">
            <IconShoppingCart className="text-[#2261ff] size-6" />
            Orders
          </CardDescription>
          <CardTitle className="text-3xl font-bold text-[#010d39] mt-2">
            {orders}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm text-[#7a8ca9]">
          Total orders placed
        </CardFooter>
      </Card>
    </div>
  );
}
