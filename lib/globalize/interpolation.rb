module Globalize
  module Interpolation
    def interpolate(name, model, args)
      translation = model.read_attribute(name, {:locale => locale_from(args)})
      try_interpolation translation, interpolation_args_from(args)
    end

    private

    def interpolation_args_from(args)
      args.detect {|a| a.is_a? Hash }
    end

    def locale_from(args)
      args.detect {|a| !a.is_a? Hash }
    end

    def try_interpolation(translation,args)
      if args
        I18n.interpolate(translation,args)
      else
        translation
      end
    end

    extend self
  end
end
