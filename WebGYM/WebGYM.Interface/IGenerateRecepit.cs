using WebGYM.ViewModels;

namespace WebGYM.Interface
{
    public interface IGenerateRecepit
    {
        GenerateRecepitViewModel Generate(int paymentId);
    }
}