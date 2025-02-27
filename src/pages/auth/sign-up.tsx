import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  async function handleSignUp(data: SignUpForm) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button
          variant={"secondary"}
          asChild
          className="absolute right-4 top-8"
        >
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center ">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece as tuas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">O teu Nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">O teu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">O teu telemóvel</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao Continuar, concordas com os nossos Termos de serviço e
              políticas de privacidade
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
