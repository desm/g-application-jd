module ApplicationHelper
  def encode_special_chars(s)
    s.gsub(/'|&|<|>/) { |match| encode(match) }
  end

  private

  def encode(char)
    case char
    when "'"
      "&#39;"
    when "&"
      "\\u0026"
    when ">"
      "\\u003e"
    when "<"
      "\\u003c"
    else
      char
    end
  end
end
