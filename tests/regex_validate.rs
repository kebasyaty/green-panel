// REGULAR EXPRESSIONS
// #################################################################################################
#[cfg(test)]
mod tests {
    use regex::RegexBuilder;

    #[test]
    fn regex_validate_username() {
        let re = RegexBuilder::new(r"^[a-z\d_@+.]+$")
            .case_insensitive(true)
            .build()
            .unwrap();
        // invalids
        assert!(!re.is_match(""));
        assert!(!re.is_match("~"));
        assert!(!re.is_match("`"));
        assert!(!re.is_match("#"));
        assert!(!re.is_match("$"));
        assert!(!re.is_match("%"));
        assert!(!re.is_match("^"));
        assert!(!re.is_match("&"));
        assert!(!re.is_match("*"));
        assert!(!re.is_match("("));
        assert!(!re.is_match(")"));
        assert!(!re.is_match("-"));
        assert!(!re.is_match("="));
        assert!(!re.is_match("{"));
        assert!(!re.is_match("}"));
        assert!(!re.is_match("["));
        assert!(!re.is_match("]"));
        assert!(!re.is_match(r#"\"#));
        assert!(!re.is_match("\\"));
        assert!(!re.is_match("|"));
        assert!(!re.is_match(";"));
        assert!(!re.is_match(":"));
        assert!(!re.is_match(r#"""#));
        assert!(!re.is_match("\""));
        assert!(!re.is_match("'"));
        assert!(!re.is_match(","));
        assert!(!re.is_match("<"));
        assert!(!re.is_match(">"));
        assert!(!re.is_match("/"));
        assert!(!re.is_match("?"));
        // valids
        assert!(re.is_match(&"_@+."));
        assert!(re.is_match(&"0123456789"));
        assert!(re.is_match(&"abcdefghijklmnopqrstuvwxyz"));
        assert!(re.is_match(&"ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
        assert!(re.is_match(&"@lice_+_2021_._"));
    }
}
