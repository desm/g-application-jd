require "json"

class ErrorSubscriber
  def report(error, handled:, severity:, context:, source: nil)
    log_message = JSON.dump({
      error_message: error,
      error_class: error.class,
      handled: handled,
      severity: severity,
      source: source,
      context: context,
      backtrace: error.backtrace
    })

    # severity can be :error, :warning, :info
    # ref: https://github.com/rails/rails/blob/6f0d1ad14b92b9f5906e44740fce8b4f1c7075dc/activesupport/lib/active_support/error_reporter.rb#L27
    logger_method = severity

    if severity == :warning
      logger_method = :warn
    end

    # Rails.logger.class == ActiveSupport::BroadcastLogger
    Rails.logger.send(logger_method, log_message)
  end
end

Rails.error.subscribe(ErrorSubscriber.new)
