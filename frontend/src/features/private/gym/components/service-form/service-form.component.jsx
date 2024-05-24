// Components
import { ButtonLoading } from "@/components/button-loading/button-loading.component";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Constants
import constants from "./constants/service-form.constants";

export const ServiceForm = ({ form, handleSubmit, label, loading }) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name={constants.FORM_FIELD_NAME.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{constants.FORM_FIELD_NAME.label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={loading}
                  placeholder={constants.FORM_FIELD_NAME.placeholder}
                  type={constants.FORM_FIELD_NAME.type}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={constants.FORM_FIELD_DESCRIPTION.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{constants.FORM_FIELD_DESCRIPTION.label}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={loading}
                  placeholder={constants.FORM_FIELD_DESCRIPTION.placeholder}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={constants.FORM_FIELD_IS_FIXED_DURATION.name}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Duración fija</FormLabel>
                <FormDescription>
                  Selecciona si el servicio tiene una duración fija
                </FormDescription>
              </div>
              <FormField
                control={form.control}
                name={constants.FORM_FIELD_IS_FIXED_DURATION.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {constants.FORM_FIELD_IS_FIXED_DURATION.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name={constants.FORM_FIELD_TIME_FROM.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{constants.FORM_FIELD_TIME_FROM.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder={constants.FORM_FIELD_TIME_FROM.placeholder}
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
                <FormLabel>{constants.FORM_FIELD_TIME_TO.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
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
          name="daysOfWeek"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Dias</FormLabel>
                <FormDescription>
                  Selecciona los días de la semana en los que se impartirá el
                  servicio
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {constants.ITEMS.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="daysOfWeek"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={constants.FORM_FIELD_CAPACITY.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{constants.FORM_FIELD_CAPACITY.label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={loading}
                  placeholder={constants.FORM_FIELD_CAPACITY.placeholder}
                  type={constants.FORM_FIELD_CAPACITY.type}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <ButtonLoading
        {...constants.BUTTON_SUBMIT_PROPS}
        {...{ label, loading }}
      />
    </form>
  </Form>
);
