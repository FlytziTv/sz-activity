import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HIKE_ITEM_STATUS_AFTER_LABELS } from "@/lib/labels";
import { ReviewHikeItem } from "../hikes/hike-checkpoints";

export default function ItemCheckPointCard({
  hikeItem,
}: {
  hikeItem: ReviewHikeItem;
}) {
  return (
    <Card className="flex items-center justify-between gap-3 rounded-lg px-3 py-2">
      <CardContent className="flex w-full items-center justify-between gap-3 p-0">
        <span className="truncate text-sm">{hikeItem.item.name}</span>
        <Select
          key={hikeItem.statusAfter ?? "OK"}
          name={`status-${hikeItem.id}`}
          defaultValue={hikeItem.statusAfter ?? "OK"}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" position="popper">
            <SelectGroup>
              {Object.entries(HIKE_ITEM_STATUS_AFTER_LABELS).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
