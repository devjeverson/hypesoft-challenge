using FluentValidation;
using Hypesoft.Application.Commands.Products;

namespace Hypesoft.Application.Validators
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Nome é obrigatório");
            RuleFor(x => x.Price).GreaterThan(0);
            RuleFor(x => x.QuantityInStock).GreaterThanOrEqualTo(0);
        }
    }
}
