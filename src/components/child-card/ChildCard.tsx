import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { pickupTimeslots } from "../../data/timeslots";
import { useState } from "react";
import { useCheckinChild, useCheckoutChild } from "../../hooks/useChildrenData";

const DEFAULT_PICKUP_TIME = "16:00";

type ChildProps = {
  name: string;
  isCheckedIn: boolean;
  checkinTime: Date;
  id: string;
};

const convertDateToReadibleString = (date: Date): string => {
  return new Date(date)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    .slice(0, 5);
};

function ChildCard({ name, isCheckedIn, checkinTime, id }: ChildProps) {
  const [pickupTime, setPickupTime] = useState(DEFAULT_PICKUP_TIME);
  const { mutateAsync: checkinChild } = useCheckinChild();
  const { mutateAsync: checkoutChild } =
    useCheckoutChild();

  const handleCheckOut = async () => {
    await checkoutChild(id);
  };

  const handleCheckIn = async () => {
    await checkinChild({ id, pickupTime });
  };

  return (
    <CCard className="m-4">
      <CCardBody>
        <CCardTitle>
          {name}
        </CCardTitle>
        <CCardText>
          {isCheckedIn
            ? `Checked in since ${convertDateToReadibleString(checkinTime)}`
            : "Not checked in"}
        </CCardText>
        <CCardText>{isCheckedIn ? `Pickup time ${pickupTime}` : ""}</CCardText>
        {isCheckedIn ? (
          <CButton color="primary" onClick={handleCheckOut}>
            Check Out
          </CButton>
        ) : (
          <div>
            <CButton color="primary" onClick={handleCheckIn}>
              Check in
            </CButton>
            <CDropdown>
              <CDropdownToggle color="secondary" label="Pickup Time">
                Pickup at: {pickupTime}
              </CDropdownToggle>
              <CDropdownMenu>
                {pickupTimeslots.map((item, index) => {
                  return (
                    <CDropdownItem
                      key={index}
                      onClick={() => setPickupTime(item)}
                    >
                      {item}
                    </CDropdownItem>
                  );
                })}
              </CDropdownMenu>
            </CDropdown>
          </div>
        )}
      </CCardBody>
    </CCard>
  );
}

export default ChildCard;
