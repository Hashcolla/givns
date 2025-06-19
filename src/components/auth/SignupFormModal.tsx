import { Modal } from "../ui/Modal";
import FormTextInput from "../ui/FormTextInput";
import AppleSvg from "@/assets/images/svg/AppleIcon";
import { useForm, type SubmitHandler } from "react-hook-form";
import {Button} from "../ui/Button";
import { toast } from "sonner";

type SignUpFormFields = {
  email: string;
  password: string;
};

const SignupFormModal = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<SignUpFormFields>();

  const onSubmit: SubmitHandler<SignUpFormFields> = async (
    data: SignUpFormFields
  ) => {
    const email = data.email;
    const password = data.password;
  };

  return (
    <Modal
      title={<Modal.Title>Create a account</Modal.Title>}
      description={
        <Modal.Description>
          Here's thebrief description about trhis form.
        </Modal.Description>
      }
      content={
        <Modal.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-2"
          >
            <div className="flex flex-1 flex-col gap-2">
              <FormTextInput
                control={control}
                placeholder="Email Address"
                name="email"
                sufixIcon={<AppleSvg size={30} className="fill-white/20" />}
              />
              <FormTextInput
                control={control}
                placeholder="Password"
                name="password"
              />
              <Modal.TitleWithBio
                className="mt-5"
                bio="Here's thebrief description about trhis form."
                title="This is the tiitle"
              />
            </div>

            <Button disabled={isSubmitting} className="py-3 font-medium">
              {isSubmitting ? "Loading" : "Create a account"}
            </Button>
          </form>
        </Modal.Content>
      }
    />
  );
};

export default SignupFormModal;
