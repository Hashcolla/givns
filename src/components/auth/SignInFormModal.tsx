import { Modal } from "../ui/Modal";
import FormTextInput from "../ui/FormTextInput";
import AppleSvg from "@/assets/images/svg/AppleIcon";
import {Button} from "../ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type SignInFormFields = {
  email: string;
  password: string;
};

const SignInFormModal = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormFields>();

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    const email = data.email;
    const password = data.password;
  };

  return (
    <Modal
      title={<Modal.Title>Sign In</Modal.Title>}
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
              {isSubmitting ? "Loading" : "Sign in"}
            </Button>
          </form>
        </Modal.Content>
      }
    />
  );
};

export default SignInFormModal;
