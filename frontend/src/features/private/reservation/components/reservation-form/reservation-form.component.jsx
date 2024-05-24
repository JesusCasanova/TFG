// Components
import { Alert } from "@/components/alert/alert.component";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLoading } from "@/components/button-loading/button-loading.component";
// Constants
import constants from "./constants/reservation-form.constants";
// Utils
import {
  getValue,
  getMonths,
  getDaysOfMonth,
} from "./utils/reservation-form.utils";

export const ReservationForm = ({
  form,
  handleSubmit,
  loading,
  message,
  service,
  services,
  user,
  users,
  reservation,
  setReservation,
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name={constants.FORM_FIELD_USER_ID.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{constants.FORM_FIELD_USER_ID.label}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setReservation({ ...reservation, userId: value });
                    field.onChange(value);
                  }}
                  disabled={loading || user.role === "user"}
                  value={reservation.userId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={constants.FORM_FIELD_USER_ID.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={constants.FORM_FIELD_SERVICE_ID.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{constants.FORM_FIELD_SERVICE_ID.label}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setReservation({ ...reservation, serviceId: value });
                    field.onChange(value);
                  }}
                  value={reservation.serviceId}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          constants.FORM_FIELD_SERVICE_ID.placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service._id} value={service._id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {service && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name={constants.FORM_FIELD_TIME_FROM.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {constants.FORM_FIELD_TIME_FROM.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={reservation.timeFrom}
                          onChange={(e) => {
                            setReservation({
                              ...reservation,
                              timeFrom: e.target.value,
                            });
                            field.onChange(e.target.value);
                          }}
                          disabled={loading || service.isFixedDuration}
                          placeholder={
                            constants.FORM_FIELD_TIME_FROM.placeholder
                          }
                          type={constants.FORM_FIELD_TIME_FROM.type}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={constants.FORM_FIELD_TIME_TO.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {constants.FORM_FIELD_TIME_TO.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={reservation.timeTo}
                          onChange={(e) => {
                            setReservation({
                              ...reservation,
                              timeTo: e.target.value,
                            });
                            field.onChange(e.target.value);
                          }}
                          disabled={loading || service.isFixedDuration}
                          placeholder={constants.FORM_FIELD_TIME_TO.placeholder}
                          type={constants.FORM_FIELD_TIME_TO.type}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={constants.FORM_FIELD_DAY_OF_WEEK.name}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      {constants.FORM_FIELD_DAY_OF_WEEK.label}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          setReservation({ ...reservation, dayOfWeek: value });
                          field.onChange(value);
                        }}
                        value={reservation.dayOfWeek}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                      >
                        {service.daysOfWeek.map((dayOfWeek) => (
                          <FormItem
                            key={dayOfWeek}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={dayOfWeek} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {getValue(dayOfWeek)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name={constants.FORM_FIELD_YEAR.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{constants.FORM_FIELD_YEAR.label}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setReservation({ ...reservation, year: +value });
                          field.onChange(+value);
                        }}
                        disabled={loading}
                        value={reservation.year}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                constants.FORM_FIELD_YEAR.placeholder
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {constants.FORM_FIELD_YEAR.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={constants.FORM_FIELD_MONTH.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{constants.FORM_FIELD_MONTH.label}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setReservation({ ...reservation, month: +value });
                          field.onChange(+value);
                        }}
                        disabled={loading || !reservation.year}
                        value={reservation.month}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                constants.FORM_FIELD_MONTH.placeholder
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getMonths({ year: reservation.year }).map(
                            (month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={constants.FORM_FIELD_DAY.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{constants.FORM_FIELD_DAY.label}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setReservation({ ...reservation, day: +value });
                          field.onChange(+value);
                        }}
                        disabled={
                          loading ||
                          !reservation.year ||
                          !reservation.month ||
                          !reservation.dayOfWeek
                        }
                        value={reservation.day}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={constants.FORM_FIELD_DAY.placeholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getDaysOfMonth({ ...reservation }).map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>
        <Alert {...{ ...message }} />
        <ButtonLoading
          {...constants.BUTTON_SUBMIT_PROPS}
          {...{ label: "Reservar", loading }}
        />
      </form>
    </Form>
  );
};

export default ReservationForm;
