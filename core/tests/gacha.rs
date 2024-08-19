#[cfg(test)]
mod test {

    use jinhsi_core::gacha::{GachaLog, GachaLogItem};
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    struct GachaResponse<T: Serialize> {
        code: i32,
        data: T,
        message: String,
    }

    fn load_test_case(json: &str) -> GachaLog {
        let data_response: GachaResponse<Vec<GachaLogItem>> = serde_json::from_str(json).unwrap();
        assert!(data_response.data.len() != 0);
        return GachaLog::new(
            jinhsi_core::gacha::Convene::EventCharacter,
            data_response.data,
        );
    }
    #[test]
    fn test_merge_gacha_log() {
        let full_record = load_test_case(include_str!("./data/gacha/full_record.json"));
        // Split1
        {
            let base = load_test_case(include_str!("./data/gacha/split1/base.json"));
            let other = load_test_case(include_str!("./data/gacha/split1/other.json"));
            let merged_record = base.merge(&other).unwrap();
            assert_eq!(merged_record, full_record)
        }
        // Split1 exchanging base and other
        {
            let other = load_test_case(include_str!("./data/gacha/split1/base.json"));
            let base = load_test_case(include_str!("./data/gacha/split1/other.json"));
            let merged_record = base.merge(&other).unwrap();
            assert_eq!(merged_record, full_record)
        }
        // Split2
        {
            let base = load_test_case(include_str!("./data/gacha/split2/base.json"));
            let other = load_test_case(include_str!("./data/gacha/split2/other.json"));
            let merged_record = base.merge(&other).unwrap();
            assert_eq!(merged_record, full_record)
        }
        // Split2 exchanging base and other
        {
            let other = load_test_case(include_str!("./data/gacha/split2/base.json"));
            let base = load_test_case(include_str!("./data/gacha/split2/other.json"));
            let merged_record = base.merge(&other).unwrap();
            assert_eq!(merged_record, full_record)
        }
    }
}
