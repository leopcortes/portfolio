type Props = {
  /**
   * Id do <form> que o botão submete. Ele fica no cabeçalho, fora do formulário,
   * como no layout original — o atributo `form` liga os dois sem precisar tirar o
   * botão do lugar nem duplicar o handler.
   */
  form: string;
};

export default function BotaoCalcular({ form }: Props) {
  return (
    <button
      type="submit"
      form={form}
      className="rounded-lg bg-calc_acento px-6 py-2 text-lg transition-colors hover:bg-calc_acento_hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie active:bg-calc_acento_hover motion-reduce:transition-none"
    >
      Calcular
    </button>
  );
}
